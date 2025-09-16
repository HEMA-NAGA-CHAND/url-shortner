import { Center, Stack, TextInput, Text, Button, Anchor } from "@mantine/core";
import { useState } from "react";
import Service from "../utils/http";

const UrlShortener = () => {
    const [originalURL, setOriginalURL] = useState("");
    const [customUrl, setCustomURL] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [shortUrlData, setShortUrlData] = useState(null);

    const service = new Service();

    const getShortUrl = async () =>{
        const response = await service.post('s',{
            customUrl,
            originalUrl: originalURL,
            expiresAt: date,
            title
        })
        console.log(response)
        setShortUrlData(response);
    }



  return (
    <Center style={{ height: "90vh" }}>
      <Stack>
        {!shortUrlData?<>
            <Text size="30px">Short your URL Here</Text>

            <TextInput
            label="Original URL"
            withAsterisk
            onChange={(e) => setOriginalURL(e.target.value)}
            value={originalURL}
            />

            <TextInput
            label="Customize Your Url(Optional)"
            onChange={(e) => setCustomURL(e.target.value)}
            value={customUrl}
            />

            <TextInput
            label="Title(Optional)"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />

            <TextInput
            label="Expiry Date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            />

            <Button 
            onClick={getShortUrl}
            variant="outline" 
            disabled={!originalURL}>
            Generate the URL</Button>
        </>:
        <>
        <Anchor href={`${service.getBaseURL()}/api/s/${shortUrlData.shortCode}`}>
        {shortUrlData.shortCode}
        </Anchor>
        </>}
      </Stack>
    </Center>
  );
};

export default UrlShortener;
