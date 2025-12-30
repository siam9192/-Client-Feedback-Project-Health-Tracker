import mongoose from 'mongoose';
import envConfig from '../config/env.config';
import userService from '../modules/user/user.service';
import projectService from '../modules/project/project.service';
import {
  sampleAdmin,
  sampleClients,
  sampleEmployees,
} from './data/user.seed.data';
import { sampleProjects } from './data/project.seed.data';
import sampleRisks from './data/risk.seed.data';
import { ProjectRiskModel } from '../modules/project-risk/project-risk.model';



async function clearAllCollections() {
  const collections = mongoose.connection.collections;
  
  const promises = Object.keys(collections).map((collectionName) => {
    console.log(`Clearing collection: ${collectionName}`);
    return mongoose.connection.collections[collectionName].deleteMany({});
  });

  await Promise.all(promises);
  console.log("All collections cleared.");
}


const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * (max + 1));
 };

 
async function main() {
  try {
    console.log('--- Script started ---');
    await mongoose.connect(envConfig.url.database as string);
    console.log('Database connected');

    //Clear full database 
   await clearAllCollections()

    // Create Admin
    console.log('Creating admin...');
    await userService.createAdmin(sampleAdmin);

    //Create Employees and Clients in Parallel
    console.log('Creating users...');
    const [employees, clients] = await Promise.all([
      Promise.all(sampleEmployees.map(e => userService.createEmployee(e))),
      Promise.all(sampleClients.map(c => userService.createClient(c)))
    ]);

    // Filter out
    const employeeIds = employees.filter(Boolean).map(e => e!._id);
    const clientIds = clients.filter(Boolean).map(c => c!._id);
    
    console.log(`Created ${employeeIds.length} employees and ${clientIds.length} clients`);

    // Create Projects
    console.log('Creating projects...');
    const createdProjects = await Promise.all(
      sampleProjects.map((project) => {
        return projectService.createProject({
          ...project,
          // Use .length - 1 to avoid out-of-bounds undefined
          employee: employeeIds[getRandomInt(1)].toString(),
          employeeIds: employeeIds.slice(0, 5).map(id => id.toString()), 
        } as any);
      }),
    );

    const projectIds = createdProjects.map(p => p._id);

    //Create Risks
    console.log('Creating risks...');
    await ProjectRiskModel.insertMany(
      sampleRisks.map((risk) => ({
        ...risk,
        project: projectIds[getRandomInt(projectIds.length - 1)],
        employee: employeeIds[getRandomInt(1)]
      }))
    );

    console.log('--- Script run successfully ---');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1); 
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected');
    process.exit(0);
  }
}

main();
