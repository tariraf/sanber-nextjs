import { useMutation } from "@/hooks/useMutation";
import Layout from "@/layout";
import { Button, Card, Grid, GridItem, Heading, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddingNotes () {
    const [input, setInput] = useState({
        title : "",
        description : ""
    })
    const route = useRouter()
    const {mutate, isLoading, isError} = useMutation()
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await mutate({url: '/api/add_notes', payload : input})
        
        if (result?.success) {
            console.log('Notes added successfully:', result)
            route.push('/notes')
        }
    }
    return (
        <Layout>
            
                <Card margin="5" padding="5">
                    <Heading>Add Notes</Heading>
                    {
                        isLoading ?
                        <div className="text-center">
                            <Spinner size='xl'/>
                        </div> :
                        <Grid gap="4">
                            <GridItem>
                                <Text>
                                    Title
                                </Text>
                                <Input type="text" onChange={handleChange} name="title" value={input.title}/>
                            </GridItem>
                            <GridItem>
                                <Text>
                                    Description
                                </Text>
                                <Textarea onChange={handleChange} value={input.description} name="description" />
                            </GridItem>
                            <GridItem>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </GridItem>
                        </Grid>
                    }
                </Card>
            
        </Layout>
    )
}