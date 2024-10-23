import React, { useContext, useEffect, useRef, useState } from 'react'
import { AxiosError } from "axios"

import { Toast, useToastController, useToastState } from '@tamagui/toast'
import { useMutation, useQuery } from "@tanstack/react-query"
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SheetProps } from 'tamagui'
import { Sheet, Text, useSheet } from 'tamagui'

import { Button, Label, Switch, H1, H2, Input, Paragraph, XStack, YStack } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert, TextInput } from 'react-native'
import { api } from '@/api'
import { useRouter } from 'expo-router'
import { InstituteContext } from '@/context/AuthContext'


export default function Landing() {
    const ref = useRef<TextInput>(null)
    const toast = useToastController()

    const router = useRouter()
    const instCtx = useContext(InstituteContext)
    const [code, setCode] = useState("")


    const instituteMetaApi = useMutation({
        mutationFn: async ({ publicId }: { publicId: string }) => (await api.get(`/institutes/get_metadata/publicid/${publicId}`)).data,
        onSuccess(data, variables, context) {
            if (data) {
                instCtx?.updateInstitute(data)
                router.navigate("/signin")
                toast.show('Your institute found successfully.', {
                    message: "",
                })
            }

        },
        onError(error, variables, context) {

            console.log(error)
            toast.show("Something went wrong.", { message: error.response?.data.message })
        },
    })


    return (
        <>
            <SafeAreaView>

                <YStack padding="$3" display='flex' gap="$3" justifyContent='center' alignItems='center' height={"100%"}>
                    <Text textAlign='center'>
                        Enter you institute code
                    </Text>
                    <Input placeholder='Institute code...' ref={ref} onChangeText={t => setCode(t)} />
                    <Button onPress={_ => {
                        router.navigate("/signin")

                        instituteMetaApi.mutate({ publicId: code })

                    }
                    }>Enter</Button>
                </YStack>
            </SafeAreaView>

        </>
    )
}



