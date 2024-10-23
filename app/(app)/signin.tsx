import React, { useContext, useEffect, useState } from 'react'



import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SheetProps } from 'tamagui'
import { H4, Sheet, Spinner, Text, useSheet } from 'tamagui'

import { Button, H1, H2, Input, Paragraph, XStack, YStack } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect } from 'expo-router'
import { AuthActionContext, AuthContext, InstituteContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/api'
import { useToastController } from '@tamagui/toast'


export default function Signin() {
  const [open, setOpen] = React.useState(false)
  const [modal, setModal] = React.useState(true)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const instituteCtx = useContext(InstituteContext)
  const authCtx = useContext(AuthContext)
  const authActionCtx = useContext(AuthActionContext)
  const toast = useToastController()
  const router = useRouter()


  const signinApi = useMutation({
    mutationFn: async (arg: { username: string, password: string, instituteId: number }) => await api.post("/driver/auth", arg),
    onSuccess(data, variables, context) {
      toast.show("Successfully logged in.")
      authActionCtx?.login(data.data)

    },
    onError(error, variables, context) {
      // toast.show(error.response?.data.message,{customData:{myPreset:"succ"}})
      if (error.response?.data.message)
        toast.show(error.response?.data.message)
      else {
        toast.show(JSON.stringify(error.response))
      }


    },
  })

  useEffect(() => {
    if (authCtx?.token) {
      router.navigate("/")

    }
  }, [authCtx])

  useEffect(() => {
    if (!instituteCtx?.institute) {
      // router.push("/landing")

      // commented because causing error
      router.navigate("/landing")

    }

  }, [instituteCtx?.institute])


  if (!instituteCtx?.institute) {
    return <YStack height={"100%"} display='flex' justifyContent='center' alignItems='center'><Spinner /></YStack>
  }



  return (
    <>
      <SafeAreaView>
        <Link href={"/landing"} style={{ padding: 10 }}>{"<"} Change Institute</Link>


        <YStack justifyContent='space-between' alignItems='center' minHeight={"50%"}  >
          <H2 textAlign='center'>{instituteCtx.institute?.name}</H2>
          <Button onPress={_ => {
            setOpen(true)
          }}>Login</Button>

        </YStack>
        <Sheet
          forceRemoveScrollEnabled={open}
          modal={modal}
          open={open}
          onOpenChange={setOpen}
          // snapPoints={snapPoints}
          snapPointsMode={"constant"}
          dismissOnSnapToBottom
          // position={position}
          // onPositionChange={setPosition}
          zIndex={100_000}
          animation="medium"
        >
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Sheet.Handle />
          <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" gap="$5">
            {/* <Button size="$6" circular icon={ChevronDown} onPress={() => setOpen(false)} /> */}
            <YStack gap={'$2'}>
              <H4 textAlign='center' fontWeight={"bold"} color={"$accentColor"}>Sign-in</H4>
              <Input width={200} placeholder='Enter Username' onChangeText={setUsername} />
              <Input width={200} placeholder='Enter password' onChangeText={setPassword} />

              <>
                {/* <InnerSheet open={innerOpen} onOpenChange={setInnerOpen} /> */}
                <Button

                  // size="$"
                  color={"$accentColor"}

                  onPress={() => {
                    signinApi.mutate({ username, password, instituteId: instituteCtx.institute?.id as number })
                  }}
                >{signinApi.isPending ? <Spinner /> : "Continue"}</Button>
              </>

            </YStack>

          </Sheet.Frame>
        </Sheet>
      </SafeAreaView></>
  )
}







function InnerSheet(props: SheetProps) {
  return (
    <Sheet animation="medium" modal snapPoints={[90]} dismissOnSnapToBottom {...props}>
      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame flex={1} justifyContent="center" alignItems="center" space="$5">
        <Sheet.ScrollView>
          <YStack p="$5" gap="$8">
            <Button
              size="$6"
              circular
              alignSelf="center"
              icon={ChevronDown}
              onPress={() => props.onOpenChange?.(false)}
            />

            <H2>Hello world</H2>

          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}