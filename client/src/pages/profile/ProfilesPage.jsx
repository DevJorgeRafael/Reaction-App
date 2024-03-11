import { useEffect } from "react";
import { useUser } from "../../context/userContext";
import { ShowSimpleProfile } from "../../components/profile/ShowSimpleProfile";
import { useNavigate } from "react-router-dom";

function ProfilesPage() {
    const navigate = useNavigate()
    const { users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-2" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0rem 1rem'
        }}>
            {users.map((user) => (
                <ShowSimpleProfile key={user._id} user={user} />
            ))}
        </div>
    );
}

export default ProfilesPage;
