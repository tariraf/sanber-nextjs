import { useMutation } from "@/hooks/useMutation";
import { Button, Card, Grid, GridItem, Heading, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const [show, setShow] = useState(false)
    const handlePassword = () => setShow(!show)
    const [inputLogin, setInputLogin] = useState({
        email : "",
        password : ""
    })
    const {mutate} = useMutation()
    const toast = useToast()
    const route = useRouter()
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInputLogin({ ...inputLogin, [name]: value });
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        const response = await mutate({url : `https://paace-f178cafcae7b.nevacloud.io/api/login`, payload: inputLogin})

        if (!response?.success) {
            toast({
                title: 'Login failed',
                description: "There's something wrong. Check your email or password",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top",
            })
        } else {
            Cookies.set('user_token', response?.data?.token, {expires : new Date(response?.data?.expires_at), path: '/'})
            route.push('/')
        }
    }
    return(
        <Card margin="5" padding="5">
                    <Heading>Login</Heading>
                        <Grid gap="4">
                            <GridItem>
                                <Text>
                                    Email
                                </Text>
                                <Input type="email" placeholder="Enter your email" value={inputLogin.email} name="email" onChange={handleChange}/>
                            </GridItem>
                            <GridItem>
                                <Text>
                                    Password
                                </Text>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        value={inputLogin.password}
                                        name="password"
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handlePassword}>
                                        {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </GridItem>
                            <GridItem>
                                <Button onClick={handleLogin}>Login</Button>
                            </GridItem>
                        </Grid>
                </Card>
    )
}