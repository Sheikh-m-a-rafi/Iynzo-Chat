import { styles } from '@/assets/styles/AuthScreen.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'
import { Colors } from '../../../constants/Colors'
import { TextInput } from 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'

type Mode = "login" | "register"

export default function AuthScreen() {

  const [mode, setMode] = useState<Mode>("register")
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);


  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setVerifying(true) }, 1500)
  }

  const handleVerify = async () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); router.replace("/(tabs)") }, 1500)
  }

  const svgMarkup = `<svg width="63" height="71" viewBox="0 0 63 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.87793 22.8482V40.4288L11.7198 34.2753V23.4334L28.1291 14.0567L17.5814 7.61719L5.98284 14.1282C2.82985 15.8982 0.87793 19.2324 0.87793 22.8482Z" fill="white"/>
<path d="M63 47.4682V29.8876L52.1581 36.0411V46.883L35.7488 56.2597L46.2965 62.6992L57.8951 56.1882C61.0481 54.4182 63 51.084 63 47.4682Z" fill="white"/>
<path d="M62.5224 22.1214L62.707 24.614L51.8652 30.4744V23.4419L21.0977 6.43948L31.6454 0L57.3558 14.0907C60.3274 15.7193 62.2721 18.742 62.5224 22.1214Z" fill="white"/>
<path d="M0.184636 48.7927L0 46.3001L10.8419 40.4396V47.4722L41.6093 64.4746L31.0616 70.9141L5.35122 56.8233C2.37962 55.1947 0.434958 52.172 0.184636 48.7927Z" fill="white"/>
</svg>`

if (verifying) {
  return (
    <SafeAreaView style={styles.safe}>

    <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios" ? "padding": undefined}>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}

        <View style={styles.logoRow}>

          <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>

            <SvgXml xml={svgMarkup} width="60%" height="60%" />

          </LinearGradient>

          <Text style={styles.appName}>IynzoChat</Text>

        </View>

        {/* Hero text */}

        <Text style={styles.heading}>
         Verify Email
        </Text>
        <Text style={styles.subheading}>
          We've sent a verification code to your email. Please enter it below to continue.
        </Text>

        {/* Form */}

        <View style={styles.form}>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Verification Code</Text>
            <TextInput
                style={styles.input}
                value={verificationCode}
                onChangeText={setVerificationCode}
                placeholder='Enter verification code'
                placeholderTextColor={Colors.outlineVariant}
                keyboardType='number-pad'
                autoCapitalize='none'
                />
          </View>

          {/* Back to Sign up Link */}

          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>
              Didn't receive the code?
            </Text>
            <TouchableOpacity onPress={() => setVerifying(false)}>
              <Text style={styles.toggleLink}>
                Back to Previous Page
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit */}

          <TouchableOpacity onPress={handleVerify} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper} >

            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} start ={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.btn}>
              {loading ? (<ActivityIndicator  color={Colors.onPrimary} size="small"/>) : 
              (
                <>
                <Text style={styles.btnText}>
                  Verify Code
                </Text>
                <Ionicons name="arrow-forward" size={18} color={Colors.onPrimary} />
                </>
              )}
            </LinearGradient>

          </TouchableOpacity>

          </View>


      </ScrollView>

    </KeyboardAvoidingView>

   </SafeAreaView>
  )
}

  return (
   <SafeAreaView style={styles.safe}>

    <KeyboardAvoidingView style={styles.kav} behavior={Platform.OS === "ios" ? "padding": undefined}>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo */}

        <View style={styles.logoRow}>

          <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} style={styles.logoBox}>

            <SvgXml xml={svgMarkup} width="60%" height="60%" />

          </LinearGradient>

          <Text style={styles.appName}>IynzoChat</Text>

        </View>

        {/* Hero text */}

        <Text style={styles.heading}>
          {mode === "login" ? "Welcome back 👋" : "Create an account."}
        </Text>
        <Text style={styles.subheading}>
          {mode === "login" ? "Sign in to your account" : "Fill in your details to get started."}
        </Text>

        {/* Form */}

        <View style={styles.form}>
          
          {mode === "register" && (

            <>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder='Your name'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='words'/>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Username Handle</Text>
              <View style={styles.handleRow}>
                <Text style={styles.atSign}>@</Text>
                <TextInput 
                style={[styles.input , styles.handleInput]}
                value={handle}
                onChangeText={(v) => setHandle(v.toLowerCase().replace(/\s/g, ""))}
                placeholder='username'
                placeholderTextColor={Colors.outlineVariant}
                autoCapitalize='none'
                />
              </View>
            </View>
            </>

          )}

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='you@example.com'
                placeholderTextColor={Colors.outlineVariant}
                keyboardType='email-address'
                autoCapitalize='none'
                />
          </View>
            <View style={styles.field}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder='••••••••'
                placeholderTextColor={Colors.outlineVariant}
                secureTextEntry
                />
          </View>

          {/*Toggle mode*/}
          <View style={styles.toggleRow}>

            <Text style={styles.toggleText}>
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </Text>
            <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")}>
              <Text style={styles.toggleLink}>
                {mode === "login" ? "Sign up" : "Sign in"}
              </Text>
            </TouchableOpacity>

          </View>

          {/* Submit */}

          <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.88} style={styles.btnWrapper} >

            <LinearGradient colors={[Colors.primary, Colors.primaryContainer]} start ={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.btn}>
              {loading ? (<ActivityIndicator  color={Colors.onPrimary} size="small"/>) : 
              (
                <>
                <Text style={styles.btnText}>
                  {mode === "login" ? "Sign In" : "Create Account"}
                </Text>
                <Ionicons name="arrow-forward" size={18} color={Colors.onPrimary} />
                </>
              )}
            </LinearGradient>

          </TouchableOpacity>

          </View>


      </ScrollView>

    </KeyboardAvoidingView>

   </SafeAreaView>
  )
}