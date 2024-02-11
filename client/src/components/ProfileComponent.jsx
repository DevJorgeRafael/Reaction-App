import { useUser } from "../context/userContext"
import { Avatar, Button, Card, CardContent, Grid, Typography } from "@mui/material"

function ProfileComponent() {
    const { user } = useUser()
    if (user) console.log(user)

    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Avatar alt={user.name} src={user.image.url} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5">{user.name}</Typography>
                        <Typography variant="subtitle1">{user.username}</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                        <Button variant="contained" color="primary">
                            Subir imagen
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ProfileComponent
