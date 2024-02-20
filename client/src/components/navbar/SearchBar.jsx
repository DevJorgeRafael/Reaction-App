import { useState, useRef, useEffect } from 'react';
import { styled, alpha, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const searchRef = useRef();

    useEffect(() => {
        if (isOpen) {
            searchRef.current.focus();
        }
    }, [isOpen]);

    const handleIconClick = () => {
        if (isOpen && inputValue === '') {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <Search>
            <SearchIconWrapper onClick={handleIconClick}>
                <SearchIcon style={{ fontSize: 30 }} />
            </SearchIconWrapper>
            {isOpen && (
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    ref={searchRef}
                    onChange={handleInputChange}
                />
            )}
        </Search>
    );
}

export default SearchBar;
