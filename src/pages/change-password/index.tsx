import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const ChangePasswordView = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     console.log({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className='!bg-primary/10 px-10 pt-10 pb-32 h-full overflow-y-scroll text-white'>
      <h2 className='text-xl font-semibold mb-6'>Change Password</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
         <div>
          <label className='block mb-1'>Current Password</label>
          <Input
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder='Enter current password'
            className='bg-primary/10 border border-primary text-white'
          />
        </div>

         <div>
          <label className='block mb-1'>New Password</label>
          <Input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter new password'
            className='bg-primary/10 border border-primary text-white'
          />
        </div>

         <div>
          <label className='block mb-1'>Confirm New Password</label>
          <Input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm new password'
            className='bg-primary/10 border border-primary text-white'
          />
        </div>

         <Button
          type='submit'
          className='mt-4 bg-primaryGradient border border-primary text-black px-6 py-2'
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordView;
