import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { rtdb } from "../firebase";

interface User {
    userId: string;
    online: boolean;
    // 다른 사용자 정보 필드들도 필요하다면 추가하세요
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
                    online: userData.online // 사용자 데이터의 online 필드를 가져옵니다.
                }));
                // Online 상태가 true인 사용자만 필터링
                const onlineUsers = userList.filter(user => user.online === true);
                setUsers(onlineUsers);

                // Online 상태가 false인 사용자 삭제
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
