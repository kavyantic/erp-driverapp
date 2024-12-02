// fetch-and-generate-types.js
import { compile } from "json-schema-to-typescript";
import fetch from "node-fetch";
import axios from "axios";
import fs from "fs";
import os from 'os'
function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];

    for (const iface of networkInterface) {
      // Check for IPv4 and non-internal (i.e., external) address
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }

  return "No external IPv4 address found";
}
// URL of the JSON schema
const schemaUrl = `http://${getLocalIPAddress()}:8000/api-types`;

async function fetchJsonSchema(url) {
  console.log("downloading from " + schemaUrl);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch JSON schema: ${response.statusText}`);
  }
  console.log("downloaded successfully");
  return response.json();
}

async function generateTypes() {
  try {
    const schema = await fetchJsonSchema(schemaUrl);
    console.log("generating types...");

    const typescriptCode = await compile(schema, "GeneratedTypes", {
      unreachableDefinitions: true,
      additionalProperties: false,
    });

    console.log("writing...");
    fs.writeFileSync("api-types.d.ts", typescriptCode);
    console.log("TypeScript types generated successfully.");
  } catch (error) {
    console.error("Error generating TypeScript types:", error);
  }
}

generateTypes();
