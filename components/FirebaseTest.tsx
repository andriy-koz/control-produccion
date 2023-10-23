'use client'

import {database, app} from '../firebase';
import {collection, addDoc, getDocs} from 'firebase/firestore';

export default function FirebaseTest() {
    const dbInstance = collection(database, 'objetivos');
    const handleClick = () => {
        addDoc(dbInstance, {testing: 'probando'});
    }
    return <button onClick={handleClick} className='px-4 py-4'>GO</button>
}