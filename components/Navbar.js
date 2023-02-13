import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
const Navbar = () => {
    return (
        <>
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TOPKEY 禁用物料清單資訊
                </Typography>
            </AppBar>
        </>
    )
}

export default Navbar;