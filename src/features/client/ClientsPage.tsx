import { Box } from "@mui/material";
import { useContext } from "react";
import { ClientService } from "../../services/ClientService";
import { AppContext } from "../../utilities/context/AppContext";
import { RUDTable } from "../../utilities/table/RUDTable";
import AddClient from "./AddClient";

const ClientsPage = () => {
    const { setPageTitle } = useContext(AppContext);

    setPageTitle("Clients");
    return (
        <Box>
            <AddClient />

            <RUDTable
                getter={(page, limit) =>
                    ClientService.getInstance().getClients(page, limit)
                }
                readables={{
                    id: "ID",
                    name: "Name",
                    username: "Username",
                    password: "Password",
                }}
                editables={[]}
                ops={{ read: "READ CLIENT" }}
            />
        </Box>
    );
};

export default ClientsPage;
