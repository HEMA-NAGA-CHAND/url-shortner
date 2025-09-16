import { useEffect, useState } from "react"
import Service from "../utils/http";
import { Anchor, Table } from "@mantine/core";

const MyUrls = () => {
    const[data,setData] = useState([]);

    const service = new Service();

    const getData = async () =>{
        const response = await service.get("user/my/urls")
        console.log(response)
        setData(response.shortURLs|| [])
    }

    useEffect(()=>{
        getData()
    },[])


    return(
        <div>
            <Table>
                <Table.Thead>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Original Url</Table.Th>
                    <Table.Th>Short Url</Table.Th>
                    <Table.Th>Created Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                </Table.Thead>
                <Table.Tbody>
                    {data?.map((d)=>(
                        <Table.Tr>
                            <Table.Td>{d?.title|| "No Title"}</Table.Td>
                            <Table.Td><Anchor href={d?.originalUrl} >{d?.originalUrl}</Anchor></Table.Td>
                            <Table.Td>{d?.shortCode}</Table.Td>
                            <Table.Td>{new Date(d?.createdAt).toLocaleDateString()}</Table.Td>
                            <Table.Td>{d?.isActive?"Active":"Not-Active"}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )

}

export default MyUrls;