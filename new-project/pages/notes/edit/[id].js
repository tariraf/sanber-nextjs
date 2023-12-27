import Layout from "@/layout";
import { Button, Card, Grid, GridItem, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditNotes () {
    const [input, setInput] = useState({
        title : "",
        description : ""
    })
    const route = useRouter()
    const {id} = route.query

    useEffect(()=> {
        fetch(`/api/notes_id?id=${id}`)
        .then(res => res.json())
        .then((res) => {
            const data = res.data
            console.log(data)
            setInput(
                {
                    title : data.title,
                    description : data.description
                }
            )
        })
        .catch((err) => {
            console.log(err)
        })
        }, [id])

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/update_notes?id=${id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(input),
            })
      
            const responseData = await response.json();
            console.log('Notes updated successfully:', responseData)
            if (responseData?.success) {
                route.push('/notes')
            }
          } catch (error) {
            console.error('Error adding notes:', error.message)
          }
    }
    return (
        <Layout>
            <Card margin="5" padding="5">
                <Heading>Edit Notes</Heading>
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
            </Card>
        </Layout>
    )
}