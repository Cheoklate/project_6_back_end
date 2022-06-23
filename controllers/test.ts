import moment from 'moment'

const habitObject = {
    userHabits_id: "62aae3416434f773dcfa9bd4",
    habitStartDate: "2022-06-16T14:56:59.301Z",
    habitName: 'Eat veg',
    habitAction: [ [Object], [Object] ],
    habitStreak: {
      totalExpectedCount: 1,
      completedCount: 0,
      streakCount: 2,
      achievementRate: 0,
      _id: "62b3dad4325a62053ea52eb0"
    }
  }

const frequencyUnit =  "weekly"
// {
//   "_id": {
//     "$oid": "62aae3416434f773dcfa9bd4"
//   },
//   "habitName": "Eat veg",
//   "habitDesc": "123",
//   "isPublic": true,
//   "frequencyUnit": "daily",
//   "frequencyNumber": 0,
// }
function setAchievementRate(completedCount:number, totalExpectedCount:number) {
  const achievementRate = completedCount/totalExpectedCount
  return achievementRate
}

function resetStreakData( frequencyUnit:string, habitObject:any) {

  const start = moment(habitObject.habitStartDate);
  const curDate = moment(new Date());
  const diff = curDate.diff(start, "days")

  console.log(start, curDate, diff)
  
  // count achievement rate
  // const achievementRate = setAchievementRate(habitObject.habitStreak.completedCount, habitObject.habitStreak.totalExpectedCount)
  const achievementRate = 1.2

  if (frequencyUnit === "weekly") {
    if(diff >= 6 && achievementRate >= 1) {
      console.log('reset')
      habitObject.habitStreak.streakCount += 1
    } 
  } 
}

resetStreakData(frequencyUnit,habitObject)