
import React from 'react';
import { getUser } from '../../utilities/users-service';
import NavBar from '../../components/NavBar/NavBar';
import Schedules from '../../components/Schedules/Schedules';

export default function App() {
  const [user, setUser] = React.useState(getUser());
  const [hide, setHide] = React.useState()
  const [data, setData] = React.useState()
  const [sport, setSport] = React.useState()
  const [checked, setChecked] = React.useState(false)
  const [comp, setComp] = React.useState()

  React.useEffect(() => {
    const reqUser = () => {
      fetch("https://shortstravel.herokuapp.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reqUser();
  }, []);



  function handleHide(evt) {
    setHide(evt.target.value)
  }
  function handleChange(evt) {
    setChecked(!checked)
  }

  return (
    <main onClick={handleHide} style={{ backgroundColor: checked ? 'rgb(49, 49, 49)' : 'rgb(242, 241, 231)', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {user ?
        <>
          <NavBar hide={hide} handleChange={handleChange} checked={checked} user={user} setUser={setUser} setData={setData} setSport={setSport} setComp={setComp} />
          {comp ?
            <Schedules data={data} sport={sport}/>
            :
            <div style={{'width':'100%', 'height': '100vh'}}>
            <img src={require('../../assets/shortsTravel.webp')} alt='SHORTS-TRAVEL' width='100%' height='100%'></img>
            </div>
          }
        </>
        :
        <>
           <NavBar hide={hide} handleChange={handleChange} checked={checked} user={user} setUser={setUser} setData={setData} />
           <div style={{'width':'100%', 'height': '100vh'}}>
            <img src={require('../../assets/shortsTravel.webp')} alt='SHORTS-TRAVEL' width='100%' height='100%'></img>
            </div>
        </>
      }
    </main>
  );
}

