import { Add, Visibility } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Step,
    StepButton,
    StepLabel,
    Stepper,
    useTheme,
} from "@mui/material";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { Autocomplete } from "../../utilities/AutoComplete";
import TextField from "../../utilities/TextField";

const initialClient: Client = {
    name: "",
    description: "",
    address: "",
    phone: "",
    mobile: "",
    email: "",
    app_username: "",
    app_password: "",
    expiry: "",
    visitingTime: "",
    followupTime: "",
    installationTime: "",
    type: "trial",
    packageType: "starter",
    status: "active",
    theme: "",
} as Client;

const initialSteps = {
    1: { label: "Personal Information", completed: false },
    2: { label: "Account Information", completed: false },
};

const AddClient = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [steps, setSteps] = useState(initialSteps);
    const [client, setClient] = useState(initialClient);
    const [showForm, setShowForm] = useState(false);

    const isLastStep = useMemo(() => {
        const stepKeys = Object.keys(steps);
        const activeStepKeyIndex = stepKeys.indexOf(activeStep + "");
        const nextStepKey = stepKeys.at(activeStepKeyIndex + 1);

        return Boolean(!nextStepKey);
    }, [activeStep]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        const change = { [name]: value };

        setClient({ ...client, ...change });
    }

    async function handleNewClient(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const [data, err] = await ClientService.getInstance().createClient(
            client
        );
    }

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={() => setShowForm(true)}
            >
                add client
            </Button>

            <form onSubmit={handleNewClient}>
                <Dialog
                    open={showForm}
                    onClose={() => setShowForm(false)}
                    fullWidth
                >
                    <DialogTitle>
                        Add Client
                        <Stepper activeStep={activeStep} sx={{ my: 2 }}>
                            {Object.entries(steps).map(([stepId, step]) => (
                                <Step
                                    key={stepId}
                                    active={activeStep + "" === stepId}
                                    completed={step.completed}
                                >
                                    <StepButton
                                        onClick={() =>
                                            setActiveStep(parseInt(stepId))
                                        }
                                    >
                                        <StepLabel>{step.label}</StepLabel>
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </DialogTitle>

                    <DialogContent>
                        <Box>
                            {activeStep === 1 && (
                                // <Fade in={activeStep === 1}>
                                <PersonalInfo
                                    client={client}
                                    changeHandler={handleChange}
                                />
                                // </Fade>
                            )}

                            {activeStep === 2 && (
                                // <Fade in={activeStep === 2}>
                                <AccountInfo
                                    client={client}
                                    changeHandler={handleChange}
                                />
                                // </Fade>
                            )}
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined">close</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            onClick={() =>
                                isLastStep
                                    ? handleNewClient
                                    : setActiveStep((step) => step + 1)
                            }
                        >
                            {isLastStep ? "create" : "next"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </>
    );
};

export default AddClient;

type InfoStepProps = {
    client: Client;
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PersonalInfo = ({
    client,
    changeHandler: handleChange,
}: InfoStepProps) => {
    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
            <TextField
                autoComplete="name"
                name="name"
                required
                label="Name"
                autoFocus
                value={client.name}
                variant="outlined"
                onChange={handleChange}
            />

            <TextField
                name="email"
                label="Email"
                variant="outlined"
                type="email"
                value={client.email}
                onChange={handleChange}
                required
            />

            <TextField
                onChange={handleChange}
                name="phone"
                label="Phone"
                required
                variant="outlined"
                value={client.phone}
            />

            <TextField
                onChange={handleChange}
                required
                label="Description"
                name="description"
                value={client.description}
                variant="outlined"
                multiline
                minRows={4}
            />

            <TextField
                onChange={handleChange}
                required
                label="Address"
                name="address"
                variant="outlined"
                value={client.address}
            />

            <TextField
                onChange={handleChange}
                name="mobile"
                label="Mobile"
                variant="outlined"
                value={client.mobile}
                required
            />
        </Box>
    );
};

const AccountInfo = ({
    client,
    changeHandler: handleChange,
}: InfoStepProps) => {
    const theme = useTheme();

    return (
        <Box display="flex" flexDirection="column" gap={theme.spacing(2)}>
            <TextField
                onChange={handleChange}
                required
                name="app_username"
                label="App username"
                variant="outlined"
                value={client.app_username}
            />

            <TextField
                onChange={handleChange}
                required
                type="password"
                name="app_password"
                label="App password"
                variant="outlined"
                value={client.app_password}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={(ev) => {
                                const inputElement =
                                    ev.currentTarget.parentElement?.firstChild;
                                const inputType = (
                                    inputElement as any
                                ).getAttribute("type");
                                (inputElement as any).setAttribute(
                                    "type",
                                    inputType === "text" ? "password" : "text"
                                );
                            }}
                        >
                            <Visibility />
                        </IconButton>
                    ),
                }}
            />

            <TextField
                onChange={handleChange}
                type="date"
                required
                name="expiry"
                variant="outlined"
                value={client.expiry}
                label="Expiry Date"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                onChange={handleChange}
                title="Visiting time"
                type="date"
                name="visitingTime"
                variant="outlined"
                value={client.visitingTime}
                label="Visiting Time"
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                onChange={handleChange}
                name="followupTime"
                label="Follow upTime"
                variant="outlined"
                type="date"
                value={client.followupTime}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                onChange={handleChange}
                name="installationTime"
                label="Installation time"
                variant="outlined"
                type="date"
                value={client.installationTime}
                InputLabelProps={{ shrink: true }}
            />

            <Autocomplete
                labelKey="type"
                label="Client Type"
                setOutput={(value) => {}}
                api="/superadmin/client/client-types"
                processor={(opt) => ({
                    ...opt,
                    id: opt.type,
                })}
            />

            <TextField
                // select
                name="type"
                variant="outlined"
                label=" Client type"
                value={client.type}
                //
                required
            >
                {/* {clientTypes.map((client: any, idx) => (
                    <MenuItem key={idx} value={client.type}>
                        {client.type}
                    </MenuItem>
                ))} */}
            </TextField>

            <TextField
                // select
                name="packageType"
                variant="outlined"
                label="PackageType"
                value={client.packageType}
                //
                required
            >
                {/* {clientpackage.map((packages: any, idx) => (
                    <MenuItem key={idx} value={packages.package}>
                        {packages.package}
                    </MenuItem>
                ))} */}
            </TextField>

            <TextField
                // select
                name="status"
                variant="outlined"
                label="Status"
                value={client.status}
                required
            >
                {/* {clientStatus.map((Stat: any, idx) => (
                    <MenuItem key={idx} value={Stat.status}>
                        {Stat.status}
                    </MenuItem>
                ))} */}
            </TextField>
        </Box>
    );
};
