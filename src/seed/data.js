const ref = require('./sideArms.json')
const schedules = require('./sideArmSchedules.json')

const sportCode = {
    "Baseball": 'MBA',
    "Football": 'MFB',
    "Men's Basketball": 'MBB',
    "Men's Gymnastics": 'MGY',
    "Men's Ice Hockey": `MIH`,
    "Men's Soccer": 'MSO',
    "Men's Track & Field": 'MTF',
    "Men's Indoor Track": 'MTI',
    "Men's Outdoor Track": 'MTO',
    "Men's Volleyball": 'MVB',
    "Women's Basketball": 'WBB',
    "Women's Gymnastics": 'WGY',
    "Women's Ice Hockey": 'WIH',
    "Women's Soccer": 'WSO',
    "Women's Softball": 'WSB',
    "Women's Track & Field": 'WTF',
    "Women's Indoor Track": 'WTI',
    "Women's Outdoor Track": 'WTO',
    "Women's Volleyball": 'WVB',
}
const sportList = () => {
    return [ "Baseball", "Football","Men's Basketball", "Men's Gymnastics", "Men's Ice Hockey","Men's Soccer", "Men's Track & Field","Men's Indoor Track","Men's Outdoor Track", "Men's Volleyball", "Women's Basketball", "Women's Gymnastics","Women's Ice Hockey","Women's Soccer","Women's Softball", "Women's Track & Field","Women's Indoor Track", "Women's Outdoor Track", "Women's Volleyball",] 
}

 function findAllConferences () {
    const conf = []
    for(let i = 0; i < ref.length; i++) {
        if (ref[i].conferenceName) {
            conf.push(ref[i].conferenceName)
        }
    }
   const newArr = [...new Set(conf)]
   return newArr
}
function findSchoolsByConference (conference) {
    let result = new Set()
    for (let i = 0; i < ref.length; i++) {
        if ( conference === ref[i].conferenceName ) {
            result.add(ref[i].schoolName)
        }
    }
    return [...result]
}

function findSchoolSports (school) {
    let result = []
    for (let i = 0; i < ref.length; i++) {
        if (ref[i].schoolName === school) {
            for (let key in ref[i]) {
                if (sportCode[key]){
                    result.push(key)
                }
            }
            }
        }
        // console.log(result)
        return result
}

function findAllSchools () {
    let result = new Set()
    for (let i = 0; i < ref.length; i++) {
        result.add(ref[i].schoolName)
    }
    return [...result]
}

function pullSchoolSportSchedules(school, sport) {
    let result
    for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].schoolName === school) {
            for (let key in schedules[i]['sports']) {
                if (key === sport) {
                    result = schedules[i]['sports'][key]
                    break
                }
            }
        }

    }
    return result
 }


module.exports = {
    findAllConferences,
    findSchoolsByConference,
    findSchoolSports,
    findAllSchools,
    sportList,
    pullSchoolSportSchedules,
    // pullSportsSchedules,
}

