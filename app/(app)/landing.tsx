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
import { useAppDispatch, useAppSelector } from '@store'
import { updateInstitute } from '@/store/slices/authSlice'


export default function Landing() {
    const ref = useRef<TextInput>(null)
    const toast = useToastController()
    const dispatch = useAppDispatch()

    const router = useRouter()
    const inst = useAppSelector(s => s.auth.institute)
    const [code, setCode] = useState("")


    const instituteMetaApi = useMutation({
        mutationFn: async ({ publicId }: { publicId: string }) => (await api.get(`/institutes/get_metadata/publicid/${publicId}`)).data,
        onSuccess(data, variables, context) {
            if (data) {
                dispatch(updateInstitute(data))
                // alert("dipe")
                router.navigate("/signin")
                toast.show(`${data.name}. `, {
                    

                })
            }

        },
        onError(error, variables, context) {
            if (error.response?.status == 404) {
                toast.show("No Institute found with " + variables.publicId+".")
                return
            }
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

                        instituteMetaApi.mutate({ publicId: code })

                    }
                    }
                    disabled={instituteMetaApi.isPending}
                    
                    >Enter</Button>
                </YStack>
            </SafeAreaView>

        </>
    )
}



