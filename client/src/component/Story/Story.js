import './style.scss';
import { useState } from 'react'

const Story = () => {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
        },
        {
            id: 2,
            name: "Ervin Howell",
            username: "Antonette",
        },
        {
            id: 3,
            name: "Clementine Bauch",
            username: "Samantha",
        },
        {
            id: 4,
            name: "Patricia Lebsack",
            username: "Karianne",
        },
        {
            id: 5,
            name: "Chelsey Dietrich",
            username: "Kamren",
        },
        {
            id: 6,
            name: "Mrs. Dennis Schulist",
            username: "Leopoldo_Corkery",
        },
        {
            id: 7,
            name: "Kurtis Weissnat",
            username: "Elwyn.Skiles",
        },
        {
            id: 8,
            name: "Nicholas Runolfsdottir V",
            username: "Maxime_Nienow",
        },
        {
            id: 9,
            name: "Glenna Reichert",
            username: "Delphine",
        },
        {
            id: 10,
            name: "Clementina DuBuque",
            username: "Moriah.Stanton",
        },
        {
            id: 11,
            name: "Donald Duck",
            username: "donald.duck",
        },
        {
            id: 12,
            name: "Adam Savage",
            username: "adam.is.savage",
        },
        {
            id: 13,
            name: "Daniel Redhill",
            username: "harry.trotter",
        },
        {
            id: 14,
            name: "Indiana Jones",
            username: "Indy Shot First",
        },
        {
            id: 15,
            name: "Claudia Beckam",
            username: "handball2020",
        },
        {
            id: 16,
            name: "Fabio Edwards",
            username: "EastCoastLion",
        },
        {
            id: 17,
            name: "Jonah Roads",
            username: "AlwaysTheFunnyGuy",
        },
        {
            id: 18,
            name: "Damian Knight",
            username: "The Rook",
        },
        {
            id: 19,
            name: "Rowan Atkinson",
            username: "Mr Bean",
        },
        {
            id: 20,
            name: "Bugs Bunny",
            username: "Albuquerque",
        },
    ]);

    const randomId = Math.floor(Math.random() * 10)
    let accountName = users[Math.floor(Math.random() * users.length)].username;
    if (accountName.length > 10) {
        accountName = accountName.substring(0, 10) + "...";
    }

    return (
        <>
            {
                users?.map((user) => (

                    <div className="story__container" key={user.id} style={{
                        width: "60px",
                        display: "flex", flexDirection: "column"

                    }}>

                        <img
                            src={`https://i.pravatar.cc/150?img=${randomId}`}
                            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                        />
                        <p>{accountName}</p>
                    </div>


                ))
            }
        </>
    )
}

export default Story;