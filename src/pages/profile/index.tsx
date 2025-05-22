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
    <div className='!bg-primary/10 px-4 sm:px-6 md:px-10 pt-10 pb-32 h-full overflow-y-auto'>
       <div className='my-6 flex flex-col md:flex-row gap-2 md:gap-4'>
        <p className='md:basis-1/5 font-medium'>Full Name *</p>
        <div className='md:basis-4/5'>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter full name'
          />
        </div>
      </div>

       <div className='my-6 flex flex-col md:flex-row gap-2 md:gap-4'>
        <p className='md:basis-1/5 font-medium'>E-mail *</p>
        <div className='md:basis-4/5'>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter email address'
          />
        </div>
      </div>

       <div className='my-6 flex flex-col md:flex-row gap-2 md:gap-4'>
        <p className='md:basis-1/5 font-medium'>Contact No *</p>
        <div className='md:basis-4/5'>
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className='w-full bg-primary/10 border border-primary'
            placeholder='Enter contact number'
          />
        </div>
      </div>

       <div className='my-6 flex flex-col md:flex-row gap-2 md:gap-4'>
        <p className='md:basis-1/5 font-medium'>Gender *</p>
        <div className='md:basis-4/5'>
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

       <div className='my-6 flex flex-col md:flex-row gap-2 md:gap-4'>
        <p className='md:basis-1/5 font-medium'>Birth Date *</p>
        <div className='md:basis-4/5'>
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            className='w-full bg-primary/10 border border-primary px-3 py-2 rounded-md text-white'
            placeholderText='Select birth date'
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

       <div className='mt-10 flex justify-center'>
        <Button className='py-2 px-10 text-base text-black'>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProfileView;
