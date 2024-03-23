import * as dotenv from 'dotenv'
import { Equipment, EquipmentName, Feedback, PrismaClient, Rent, RentalPoint, Role } from "@prisma/client";
import { randomNumber } from "../src/utils/random-number";
import { faker } from "@faker-js/faker";
import { generateSlug } from "../src/utils/generate-slug";
import { DateTime } from 'luxon'

dotenv.config()
const prisma = new PrismaClient()

const createEquipmentNames = async ()=> {
  const names = ['Ролики', 'Велосипед', 'Самокат', 'Электровелосипед', 'Электросамокат']

  const equipmentNames: EquipmentName[] = []
  for (let i = 0; i < 5; i++) {
    const equipmentName = await prisma.equipmentName.create({
      data: {
        name: names[i]
      }
    })

    equipmentNames.push(equipmentName)
  }

  console.log(`Created ${equipmentNames.length} equipmentNames`)
}

const createRent = async ()=> {
  let startTime = DateTime.local()
  let endTime = startTime.plus({ seconds: 150 })

  const rents: Rent[] = []
  for (let i = 0; i < 5; i++) {
    const rent = await prisma.rent.create({
      data: {
        startTime: startTime,
        endTime: endTime,
        idUser: 1,
        idEquipment: 6
      }
    })
    startTime = endTime
    endTime = startTime.plus({ seconds: 150 })

    rents.push(rent)
  }

  console.log(`Created ${rents.length} rents`)
}

const createFeedbacks = async ()=> {
  const feedbacks: Feedback[] = []
  for (let i = 0; i < 5; i++) {
    const feedback = await prisma.feedback.create({
      data: {
        mark: randomNumber(1, 5),
        comment: faker.random.words(),
        idRent: 1
      }
    })

    feedbacks.push(feedback)
  }

  console.log(`Created ${feedbacks.length} feedbacks`)
}

const createEquipments = async (quantity: number)=> {
  const equipments: Equipment[] = []
  for (let i = 0; i < quantity; i++) {
    const equipmentNameId = randomNumber(1, 5)
    const equipmentName = faker.commerce.productName()


    const equipment = await prisma.equipment.create({
      data: {
        idEquipmentName: equipmentNameId,
        slug: generateSlug(equipmentName),
        price: +faker.commerce.price(5, 100, 0),
        images: Array.from({ length: randomNumber(2, 6) })
          .map(() => faker.image.imageUrl(500, 500)
        ),
        idRentalPoint: 2,
      }
    })

    equipments.push(equipment)
  }

  console.log(`Created ${equipments.length} equipments`)
}

const createRentalPoints = async ()=> {
  const rentalPoints: RentalPoint[] = []

  const slugCity = 'Joshkar-Ola'
  const slugStreets = ['Stroiteley', 'Naberezhnaya', 'Lva-Tolstogo']
  const slugHouses = ['77', '26A', '70']

  const city = 'Йошкар-Ола'
  const streets = ['Строителей', 'Набережная', 'Льва Толстого']
  const houses = ['77', '26A', '70']

  for (let i = 0; i < 3; i++) {
    const slug = slugCity + '-' + slugStreets[i] + '-' + slugHouses[i]
    const rentalPoint = await prisma.rentalPoint.create({
      data: {
        city: city,
        street: streets[i],
        house: houses[i],
        slug: generateSlug(slug),
      }
    })

    rentalPoints.push(rentalPoint)
  }

  console.log(`Created ${rentalPoints.length} rentalPoints`)
}

const createRoles = async ()=> {
  const roles: Role[] = []

  const user = await prisma.role.create({
    data: {
      title: 'USER'
    }
  })

  roles.push(user)

  const admin = await prisma.role.create({
    data: {
      title: 'ADMIN'
    }
  })

  roles.push(admin)

  console.log(`Created ${roles.length} roles`)
}

async function main() {
  console.log('Start seeding...')
  // await createEquipmentNames()
  // await createRentalPoints()
  // await createEquipments(10)
  // await createRent()
  //await createFeedbacks()
  await createRoles()
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })