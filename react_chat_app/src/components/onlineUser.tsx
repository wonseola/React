import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../firebase";

interface User {
    userId: string;
    online: boolean;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const usersRef = ref(rtdb, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userList: User[] = Object.entries(data).map(([userId, userData]: [string, any]) => ({
                    userId,
                    online: userData.online
                }));
                const onlineUsers = userList.filter(user => user.online === true);
                setUsers(onlineUsers);

                userList.forEach(user => {
                    if (!user.online) {
                        const userRef = ref(rtdb, `users/${user.userId}`);
                        remove(userRef);
                    }
                });
            } else {
                setUsers([]);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <h2>Online Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.userId}>{user.userId}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;