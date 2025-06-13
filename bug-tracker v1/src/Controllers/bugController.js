import bugModel from '../Models/bugModel';

export function retriveBugs(){
    let data=[];

    data.push(new bugModel({
        _id: 1234,
        name: 'Crash on Load',
        details: 'Crashes after 3 seconds',
        steps: 'Open application and it will crash',
        version: 'V2.0',
        assigned: 'John Doe',
        creator: 'Joe Mama',
        priority: 1,
        time: '12:38',
    }))
    data.push(new bugModel({
        _id: 1234,
        name: 'Wont Load',
        details: 'Crashes after 3 seconds',
        steps: 'Open application and it will crash',
        version: 'V2.0',
        assigned: 'John Doe',
        creator: 'Joe Mama',
        priority: 3,
        time: '12:38',
    }))
    let sorted=data.sort((a,b)=>{return a.priority-b.priority});
    return sorted;
}