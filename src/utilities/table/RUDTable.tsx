import {
    ArchiveOutlined,
    DeleteForeverOutlined,
    EditOutlined,
    RefreshOutlined,
    ViewColumn,
    ViewColumnOutlined,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Checkbox,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    MenuList,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import {
    ChangeEvent,
    Dispatch,
    Fragment,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import Authorize from "../../auth/Authorize";
import { AuthorizeFallback } from "../../auth/AuthorizeFallBack";
import { TableProps } from "../../types";
import { initialFeedback } from "../constants";
import ConfirmDelete from "./ConfirmDelete";
import { EditInRUD } from "./Edit";
import SearchBar from "./SearchBar";

export const RUDTable = ({
    rowsPreprocessor = (rows) => rows,
    updatingAgents = [],
    defaultSelected = [],
    // parseTags = false,
    ...props
}: TableProps) => {
    const [rows, setRows] = useState<{ [key: string]: number | string }[]>([]);
    const [rowsCount, setRowsCount] = useState(0);
    const [pagination, setPagination] = useState({ page: 0, limit: 10 });
    const [search, setSearch] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState<null | unknown>(null);
    const [feedback, setFeedback] = useState(initialFeedback);
    const [deleteItem, setDeleteItem] = useState<{
        item: null | number;
        open: boolean;
    }>({
        item: null,
        open: false,
    });
    const [selected, setSelected] = useState(
        Object.keys(props.readables).filter(
            (k) => defaultSelected.includes(k) || defaultSelected.length === 0
        )
    );
    const [changeCount, setChangeCount] = useState(0);

    const theme = useTheme();

    const handlePageChange = (page: number) => {
        setPagination({ ...pagination, page: page });
    };

    const handleRowsPerPageChange = (
        ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPagination({ ...pagination, limit: parseInt(ev.target.value) });
    };

    const fetchRowsAndCount = async () => {
        setFeedback({ ...initialFeedback, loading: true });

        const [data, err] = await props.getter(
            pagination.page + 1,
            pagination.limit,
            search
        );

        if (data) {
            setRows(data.rows.map((r: object) => rowsPreprocessor(r)));
            setRowsCount(data.count);
            setFeedback({
                show: false,
                message: data.message,
                severity: "success",
                loading: false,
            });
        } else {
            setFeedback({
                show: false,
                message: err,
                severity: "error",
                loading: false,
            });
        }
    };

    const handleDeleteRow = async (id: number) => {
        if (!props.deletor) {
            return;
        }

        setFeedback({
            show: false,
            message: "",
            loading: true,
        });

        const [data, err] = await props.deletor([id]);

        if (data) {
            setFeedback({
                show: true,
                message: data.message,
                severity: "success",
                loading: false,
            });
            setChangeCount((n: number) => n + 1);
        } else {
            setFeedback({
                show: true,
                message: err,
                severity: "error",
                loading: false,
            });
        }
    };

    const handleEditRow = async (row: object) => {
        setRowToEdit(row);
        setEditOpen(true);
    };

    useEffect(() => {
        fetchRowsAndCount();
    }, [pagination, ...updatingAgents, changeCount, search]);

    return (
        <Authorize
            opName={props.ops.read}
            fallback={
                props.opsMessages?.read ? (
                    <AuthorizeFallback message={props.opsMessages?.read} />
                ) : null
            }
        >
            {feedback.loading && <LinearProgress />}

            <TableContainer>
                <Box>
                    <Box
                        component={Grid}
                        container
                        justifyContent="space-between"
                        mb={theme.spacing(3)}
                        position="sticky"
                        top={0}
                        bgcolor={theme.palette.background.default}
                        zIndex={3}
                    >
                        <Grid item>
                            <IconButton
                                onClick={() => setChangeCount((c) => c + 1)}
                            >
                                <RefreshOutlined />
                            </IconButton>

                            {/* <IconButton>
                                <PrintOutlined />
                            </IconButton> */}

                            <RUDTableCols
                                readables={props.readables}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            {props.actions?.map((act, id) => (
                                <Fragment key={id}>{act}</Fragment>
                            ))}
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            {props.hasSearchbar && (
                                <SearchBar
                                    setOutput={(query) => setSearch(query)}
                                    debounceChange
                                />
                            )}
                        </Grid>
                    </Box>

                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {selected
                                    .filter((key) => selected.includes(key))
                                    .map((col) => (
                                        <TableCell
                                            key={col}
                                            style={{
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {props.readables[col]}
                                        </TableCell>
                                    ))}

                                {props.customCols?.map((col) => (
                                    <TableCell key={col.header}>
                                        {col.header}
                                    </TableCell>
                                ))}

                                {props.editor && props.editables && (
                                    <Authorize
                                        opName={props.ops.edit}
                                        fallback={
                                            props.opsMessages?.edit ? (
                                                <AuthorizeFallback
                                                    message={
                                                        props.opsMessages?.edit
                                                    }
                                                />
                                            ) : null
                                        }
                                    >
                                        <TableCell>Edit</TableCell>
                                    </Authorize>
                                )}

                                {props.deletor && props.ops.delete && (
                                    <Authorize
                                        opName={props.ops.delete}
                                        fallback={
                                            props.opsMessages?.delete ? (
                                                <AuthorizeFallback
                                                    message={
                                                        props.opsMessages
                                                            ?.delete
                                                    }
                                                />
                                            ) : null
                                        }
                                    >
                                        <TableCell>
                                            {props.deleteForever
                                                ? "Delete"
                                                : "Archive"}
                                        </TableCell>
                                    </Authorize>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map(
                                (
                                    row: { [key: string]: string | number },
                                    idx: number
                                ) => (
                                    <TableRow key={idx}>
                                        {selected.map((col) => (
                                            <TableCell key={col}>
                                                {
                                                    // parseTags ? (
                                                    //     <ParseTags
                                                    //         text={row[col]}
                                                    //     />
                                                    // ) :
                                                    row[col]
                                                }
                                            </TableCell>
                                        ))}

                                        {props.customCols?.map((col) => (
                                            <TableCell key={col.header}>
                                                {col.content(row)}
                                            </TableCell>
                                        ))}

                                        {props.editor && props.editables && (
                                            <Authorize
                                                opName={props.ops.edit}
                                                fallback={
                                                    props.opsMessages?.edit ? (
                                                        <AuthorizeFallback
                                                            message={
                                                                props
                                                                    .opsMessages
                                                                    ?.edit
                                                            }
                                                        />
                                                    ) : null
                                                }
                                            >
                                                <TableCell
                                                    sx={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        handleEditRow(row)
                                                    }
                                                    title="Edit"
                                                >
                                                    <IconButton size="small">
                                                        <EditOutlined color="inherit" />
                                                    </IconButton>
                                                </TableCell>
                                            </Authorize>
                                        )}

                                        {props.deletor && props.ops.delete && (
                                            <Authorize
                                                opName={props.ops.delete}
                                                fallback={
                                                    props.opsMessages
                                                        ?.delete ? (
                                                        <AuthorizeFallback
                                                            message={
                                                                props
                                                                    .opsMessages
                                                                    ?.delete
                                                            }
                                                        />
                                                    ) : null
                                                }
                                            >
                                                <TableCell
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        setDeleteItem({
                                                            item: row.deletionId as number,
                                                            open: true,
                                                        })
                                                    }
                                                    title="Archive/Delete"
                                                >
                                                    <IconButton color="error">
                                                        {props.deleteForever ? (
                                                            <DeleteForeverOutlined />
                                                        ) : (
                                                            <ArchiveOutlined />
                                                        )}
                                                    </IconButton>
                                                </TableCell>
                                            </Authorize>
                                        )}
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </Box>

                <TablePagination
                    sx={{ position: "sticky", bottom: 0 }}
                    onPageChange={(e, page) => handlePageChange(page)}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    count={rowsCount}
                    rowsPerPage={pagination.limit}
                    component="div"
                    page={pagination.page}
                />

                {feedback.severity === "success" && rows.length === 0 && (
                    <Alert severity="warning">No data found</Alert>
                )}
            </TableContainer>

            {rowToEdit && props.editables && props.editor && (
                <EditInRUD
                    row={rowToEdit}
                    editables={props.editables}
                    open={editOpen}
                    setOpen={setEditOpen}
                    editor={props.editor}
                    setChangeCount={setChangeCount}
                />
            )}

            <ConfirmDelete
                open={deleteItem.open}
                setOpen={(v: boolean) =>
                    setDeleteItem({
                        ...deleteItem,
                        open: v,
                    })
                }
                next={
                    deleteItem.item
                        ? () => handleDeleteRow(deleteItem.item as number)
                        : () => {
                              console.log("delte item is null.");
                          }
                }
                actionOpts={
                    props.deleteForever
                        ? undefined
                        : {
                              accept: "Archive",
                              reject: "Cancel",
                              title: "Archive",
                              text: "Are you sure you want to archive this item? it will be available in the archive section",
                          }
                }
            />

            {feedback.show && (
                <Snackbar
                    open={feedback.show}
                    autoHideDuration={6000}
                    onClose={() =>
                        setFeedback((f) => ({
                            ...f,
                            show: false,
                        }))
                    }
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                    }}
                >
                    <Alert severity={feedback.severity}>
                        {feedback.message}
                    </Alert>
                </Snackbar>
            )}
        </Authorize>
    );
};

type RUDTableColsProps = {
    readables: object;
    selected: string[];
    setSelected: Dispatch<SetStateAction<string[]>>;
};

const RUDTableCols = ({
    readables,
    selected,
    setSelected,
}: RUDTableColsProps) => {
    const [showColumns, setShowColumns] = useState(false);
    const showColumnsBtn = useRef<HTMLButtonElement | null>(null);

    const theme = useTheme();

    return (
        <>
            <IconButton
                ref={showColumnsBtn}
                onClick={() => setShowColumns(true)}
            >
                {showColumns ? (
                    <ViewColumn htmlColor={theme.palette.primary.main} />
                ) : (
                    <ViewColumnOutlined />
                )}
            </IconButton>

            <Menu
                open={showColumns}
                anchorEl={showColumnsBtn.current}
                onClose={() => setShowColumns(false)}
                elevation={4}
                variant="menu"
            >
                <MenuList disablePadding sx={{ px: 1 }}>
                    {Object.entries(readables).map(([key, col]) => (
                        <MenuItem
                            key={key}
                            value={key}
                            selected={selected.includes(key)}
                            sx={{ pl: 0 }}
                            onClick={() =>
                                !selected.includes(key)
                                    ? setSelected((state) => [...state, key])
                                    : setSelected((state) =>
                                          state.filter((c) => c !== key)
                                      )
                            }
                        >
                            <Checkbox
                                size="small"
                                checked={selected.includes(key)}
                            />

                            <Typography>{col}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
};
