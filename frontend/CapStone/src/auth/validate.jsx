import { useEffect } from "react"

export default function(){
    const [token, setToken] = useState([]);
    const[valid, setValid] = useState(true);
    useEffect(() => {
        fetch("htp://localhost:9996/validate/user")
      .then((res) => res.json())
      .then((data) => {
        setToken([...data]);
      });

      fetch("htp://localhost:9996/validate/token",
        {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
      )
      .then((res) => res.json())
      .then((data) => {
        setValid([...data]);
      });  
      
      fetch("htp://localhost:9991/user/" + userid)
      .then((res) => res.json())
      .then((data) => {
        setUser([...data]);
      }); 
    }, [])


    return (
        <>
        <p>login is successful, you will now redirect to home page!!</p>
        {valid ? {home} : ""};
        </>
    )
}