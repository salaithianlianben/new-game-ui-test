'use client';

import { useState } from 'react';
 
 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

const ProfileView = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  return (
    <div className='!bg-primary/10 px-10 pt-10 pb-32 h-full overflow-y-scroll'>
       <div className='my-8 flex gap-4'>
        <p className='basis-1/5'>Full Name *</p>
        <div className='basis-4/5'>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter full name'
          />
        </div>
      </div>

       <div className='my-8 flex gap-4'>
        <p className='basis-1/5'>E-mail *</p>
        <div className='basis-4/5'>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter email address'
          />
        </div>
      </div>
       <div className='my-8 flex gap-4'>
        <p className='basis-1/5'>Contact No *</p>
        <div className='basis-4/5'>
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter contact number'
          />
        </div>
      </div>

       <div className='my-8 flex gap-4'>
        <p className='basis-1/5'>Gender *</p>
        <div className='basis-4/5'>
          <Select onValueChange={setGender}>
            <SelectTrigger className='w-full bg-primary/10 border border-primary'>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className='z-10 bg-black border border-primary'>
              <SelectItem value='male' className='hover:bg-primary/10'>Male</SelectItem>
              <SelectItem value='female' className='hover:bg-primary/10'>Female</SelectItem>
              <SelectItem value='other' className='hover:bg-primary/10'>Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

       <div className='my-8 flex gap-4'>
        <p className='basis-1/5'>Birth Date *</p>
        <div className='basis-4/5'>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            className='w-full bg-primary/10 border border-primary px-3 py-2 rounded-md text-white'
            placeholderText='Select birth date'
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

       <Button className='flex items-center justify-center py-1 px-8 text-base text-black mx-auto'>
        Submit
      </Button>
    </div>
  );
};

export default ProfileView;
