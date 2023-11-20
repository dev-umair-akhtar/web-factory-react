import { Box } from "@mui/material";
import { SuperadminService } from "../../services/SuperadminService";
import { RUDTable } from "../../utilities/table/RUDTable";

const SuperadminsPage = () => {
    return (
        <Box height={"100%"}>
            <RUDTable
                getter={(page, limit) =>
                    SuperadminService.getInstance().getSuperadmins(page, limit)
                }
                readables={{
                    id: "ID",
                    name: "Name",
                    email: "Email",
                    username: "Username",
                    password: "Password",
                }}
                rowsPreprocessor={(row: SuperAdminRow) => ({
                    ...row,
                    name: row.baseUser.name,
                    username: row.baseUser.username,
                    password: row.baseUser.password,
                })}
                editables={[]}
                ops={{ read: "READ SUPERADMIN" }}
            />
        </Box>
    );
};

export default SuperadminsPage;
