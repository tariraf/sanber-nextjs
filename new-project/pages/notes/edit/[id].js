import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import { Button, Card, Grid, GridItem, Heading, Input, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditNotes () {
    const route = useRouter()
    const {id} = route.query
    const queriesResult = useQueries({prefixUrl : `/api/notes_id?id=${id}`})
    const {data, isLoading, isError} = queriesResult
    const [input, setInput] = useState({
        title : '',
        description : ''
    })
    const {mutate} = useMutation()
    console.log(id)
    useEffect(() => {
        setInput({
          title: data?.data?.title || '',
          description: data?.data?.description || '',
        });
    }, [data]);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setInput({ ...input, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const result = await mutate({url: `/api/update_notes?id=${id}`, method : 'PATCH', payload : input})
        
        if (result?.success) {
            console.log('Notes edited successfully:', result)
            route.push('/notes')
        }

        // try {
        //     setIsLoading(true)
        //     const response = await fetch(`/api/update_notes?id=${id}`, {
        //       method: 'PATCH',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(input),
        //     })
      
        //     const responseData = await response.json();
        //     console.log('Notes updated successfully:', responseData)
        //     if (responseData?.success) {
        //         route.push('/notes')
        //         setIsLoading(false)
        //     }
        //   } catch (error) {
        //     console.error('Error adding notes:', error.message)
        //     setIsLoading(false)
        //   }
    }
    return (
        <Layout>
            <Card margin="5" padding="5">
                <Heading>Edit Notes</Heading>
                {
                    isLoading? 
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