import { Close, Search } from "@mui/icons-material";
import { Box, IconButton, TextField, useTheme } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
    setOutput: (value: string) => void;
    debounceChange?: boolean;
    value?: string;
};

const SearchBar = ({ debounceChange = false, setOutput, value }: Props) => {
    const [searchTerm, setSearchTerm] = useState(value ?? "");
    const theme = useTheme();
    const searchRef = useRef(0);

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(ev.target.value);

        if (!debounceChange) {
            // setFilter({ ...filter, search: ev.target.value });
            setOutput(ev.target.value);
        } else {
            searchRef.current++;
            const newRef = searchRef.current;

            setTimeout(() => {
                if (newRef === searchRef.current) {
                    // setFilter({ ...filter, search: ev.target.value });
                    setOutput(ev.target.value);
                    searchRef.current = 0;
                }
            }, 1000);
        }
    };

    return (
        <Box>
            <TextField
                fullWidth
                size="small"
                type="text"
                placeholder="Search"
                name="query"
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <Search
                            fontSize="small"
                            htmlColor={theme.palette.action.disabled}
                            sx={{ mr: theme.spacing(1) }}
                        />
                    ),

                    endAdornment: searchTerm && (
                        <IconButton
                            size="small"
                            onClick={() => {
                                setSearchTerm("");
                                setOutput("");
                            }}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;
