import { View, Text, ScrollView, Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import {Link, router} from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form,setform] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting,setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error',"Please fill in all details");
    }

    setisSubmitting(true);

    try {
      const result = await createUser(form.email,form.password,form.username);

      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error',error.message)
    }finally{
      setisSubmitting(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full justify-center px-4 mt-6'>
          <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>

          <FormField 
            title='Username'
            value={form.username}
            handleChangeText={(event) => setform({ ...form, username:event})}
            otherStyles='mt-10'
          />

          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(event) => setform({ ...form, email:event})}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(event) => setform({ ...form, password:event})}
            otherStyles='mt-7'
          />

          <Text className='text-base text-gray-100 font-pregular ml-56 mt-4'>Forgot Password</Text>

          <CustomButton 
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>

            <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp