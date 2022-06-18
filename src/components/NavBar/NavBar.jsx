
import * as React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as userService from '../../utilities/users-service';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"
import {
  findAllConferences,
  findSchoolsByConference,
  findSchoolSports,
  findAllSchools,
  sportList,
  pullSchoolSportSchedules,
  pullSchools
} from '../../seed/data'

const sportNav = sportList()

const schoolNav = findAllSchools()
const conferenceNav = findAllConferences()

export default function NavBar({ user, hide, setUser, setData, checked, handleChange, setYear, setSport, setComp, setSchool }) {
  const [accordion, setAccordion] = React.useState([])
  const [credentials, setCredentials] = React.useState(null)
  const [college, setCollege] = React.useState('')
  const [vh, setVh] = React.useState('')
  const [navState, setNavState] = React.useState(false)
  const [yearState, setYearState] = React.useState({})
  const accordionNav = accordion.map(el => <Grid item xs={12} md={6} lg={6}><Button variant='contained' sx={{background: yearState[el] }} onClick={handleNav} value={el} fullWidth={true}>{el}</Button></Grid>)

  React.useEffect(() => {
    if (hide === undefined) {
      setVh('')
      setNavState(false)
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [hide])

  function handleCred(evt) {
    if (evt.target.value === 'signUp') {
      setCredentials(<SignUpForm setUser={setUser} />)
    } else if (evt.target.value === 'logIn') {
      setCredentials(<LoginForm setUser={setUser} />)
    }
  }

  function handleStyle() {
    if (checked) {
      return 'rgb(49, 49, 49)'
    }
    else {
      return 'rgb(242, 241, 231)'
    }
  }

  function handleLogOut() {
    userService.logOut();
    window.open("https://shortstravel.herokuapp.com/auth/logout", "_self");
    setUser(null);
  }
  async function handleNav(evt) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    conferenceNav.forEach(async (conf) => {
      if (evt.target.value === conf) {
        const schools = findSchoolsByConference(conf)
        // setNavState(true)
        setAccordion(schools)
        return
      }
    })

    schoolNav.forEach(async (school) => {
      if (evt.target.value === school) {
        const sports = findSchoolSports(school)
        setCollege(school)
        setYearState(pullSchools(school))
        setAccordion(sports)
        return
      }
    })

    sportNav.forEach(async (sport) => {
      if (evt.target.value === sport) {
        let newData = pullSchoolSportSchedules(college, sport)
        console.log(sport)
        console.log(newData)
        setVh('')
        setNavState(false)
        setData(newData)
        setComp('schedules')
        setSport(sport)
        setSchool(college)
        let yearConfig = Object.keys(newData)
        setYear(yearConfig[0])
        setAccordion([])
        return
      }
    })
  }

  // console.log(yearState)


  function handleAccordion(evt) {
    if (evt.target.value === 'conferences') {
      setVh('100vh')
      setNavState(true)
      setAccordion(conferenceNav)

    } else if (evt.target.value === 'logIn' || evt.target.value === 'signUp') {
      setVh('100vh')
      setNavState(true)
    }
  }



  return (
    <Accordion sx={{ background: handleStyle, width: '100%', position: 'absolute', top: '0', boxShadow: 'none', height: vh, zIndex: '2' }} expanded={navState} onClick={handleAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#2196f3' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {user ?
          <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6} container direction="row">
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Button onClick={handleAccordion} variant="text" value="home"><img src={require('../../assets/shorts-logo.png')} alt='SHORTS-TRAVEL' width='30px' height='30px'></img></Button>
                <Button onClick={handleCred} sx={{ letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="conferences">CONFERENCES</Button>
              </Grid>
              <Grid
                item xs={6}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >

                <Button onClick={handleLogOut} sx={{ letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="account">LOGOUT</Button>

              </Grid>
            </Grid>
          </>
          :
          <>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Button onClick={handleCred} sx={{ letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="signUp">SIGN UP</Button>
            <Button onClick={handleCred} sx={{ letterSpacing: '2px', fontWeight: '700', fontSize: '16px' }} variant="text" value="logIn">LOG IN</Button>

          </>
        }
      </AccordionSummary>
      <Accordion sx={{ background: handleStyle, boxShadow: 'none' }}>
        <AccordionDetails sx={{ width: !user ? { md: "50%", sm: "90%" } : { md: "90%", sm: "90%" }, margin: 'auto' }} >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            alignItems="center"

          >
            {user ?
              <>
                {accordionNav}
              </>
              :
              <>
                {credentials}
              </>
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Accordion>

  );
};