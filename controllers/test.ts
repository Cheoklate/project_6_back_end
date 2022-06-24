import moment from 'moment'
// 1. when user marks action done:
//- completedCount +=1
//- achievementRate = completedCount/totalExpectedCount
//2. at start of each frequency unit:
//- check if achievementRate >=1
//  - if yes, streakCount +=1
//  - else, streakCount = 0
//- achievementRate = 0
//- completedCount = 0
// const habitObject = {
//     userHabits_id: "62aae3416434f773dcfa9bd4",
//     habitStartDate: "2022-06-22",
//     habitName: 'Eat veg',
//     habitAction: [ [Object], [Object] ],
//     habitStreak: {
//       totalExpectedCount: 1,
//       completedCount: 0,
//       streakCount: 2,
//       achievementRate: 2,
//       _id: "62b3dad4325a62053ea52eb0",
//       lastUpdated: "2022-06-22",
//       //lastUpdated: "2022-06-22T14:56:59.301Z",
//     }
//   }

// const frequencyUnit =  "monthly"
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


export default function resetStreakData( frequencyUnit:string, habitObject:any) {

  const prevDate = moment(habitObject.habitStreak.lastUpdated)
  const curDate = moment(moment(new Date()).format("YYYY-MM-DD"))
  const diff = curDate.diff(prevDate, "days")

  console.log(prevDate, curDate, diff)

  if ((frequencyUnit === "weekly" && diff >=6 ) || (frequencyUnit === "monthly" && diff >=29)) {
    if(habitObject.habitStreak.achievementRate >= 1) {
      console.log('reset')
      habitObject.habitStreak.streakCount += 1
    } else {
      habitObject.habitStreak.streakCount = 0
    }
    habitObject.habitStreak.completedCount = 0
    habitObject.habitStreak.achievementRate = 0
    habitObject.habitStreak.lastUpdated = curDate
  } 

  if (frequencyUnit === "daily") {
    if( diff === 0 && habitObject.habitStreak.achievementRate >= 1){
      habitObject.habitStreak.streakCount += 1
    } else {
      habitObject.habitStreak.streakCount = 0
    }
    habitObject.habitStreak.completedCount = 0
    habitObject.habitStreak.achievementRate = 0
    habitObject.habitStreak.lastUpdated = curDate
  }

  
}

// resetStreakData(frequencyUnit,habitObject)