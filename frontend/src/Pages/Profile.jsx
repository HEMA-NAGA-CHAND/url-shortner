import { useEffect, useState } from "react";
import Service from "../utils/http";
import { Card, Loader, Center, Text } from "@mantine/core";

const Profile = () => {
  const [data, setData] = useState(null);
  const service = new Service();

  const getData = async () => {
    try {
      const response = await service.get("user/me");
      console.log("Response:", response);
      setData(response);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" variant="dots" />
      </Center>
    );

  return (
    <Center style={{ height: "100vh" }}>
      <Card
        shadow="lg"
        padding="xl"
        radius="lg"
        withBorder
        style={{
          width: 350,
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
        className="profile-card"
      >
        <img
          src={data.avatar}
          alt={data.name}
          width={120}
          style={{
            borderRadius: "50%",
            border: "4px solid #4dabf7",
            marginBottom: "1rem",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <Text size="xl" weight={700}>
          {data.name}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {data.email}
        </Text>
      </Card>
    </Center>
  );
};

export default Profile;
