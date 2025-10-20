'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Building, MapPin } from 'lucide-react';
import type { UserProfile } from '@/types';

const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+31 6 12345678',
  company: 'Acme Corporation',
  address: 'Prinsestraat 123',
  city: 'Den Haag',
  country: 'Netherlands',
  postalCode: '2513 CB',
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<UserProfile>(userProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userProfile);
  };

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} aria-label="Edit profile" tabIndex={0}>Edit Profile</Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                  <User className="inline-block mr-2 h-4 w-4" />Full Name
                </label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  <Mail className="inline-block mr-2 h-4 w-4" />Email Address
                </label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Email address" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none">
                  <Phone className="inline-block mr-2 h-4 w-4" />Phone Number
                </label>
                <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Phone number" />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium leading-none">
                  <Building className="inline-block mr-2 h-4 w-4" />Company
                </label>
                <input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Company name" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>Your billing and shipping address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium leading-none">
                  <MapPin className="inline-block mr-2 h-4 w-4" />Street Address
                </label>
                <input id="address" name="address" type="text" value={formData.address} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Street address" />
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium leading-none">City</label>
                <input id="city" name="city" type="text" value={formData.city} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="City" />
              </div>
              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium leading-none">Postal Code</label>
                <input id="postalCode" name="postalCode" type="text" value={formData.postalCode} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Postal code" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="country" className="text-sm font-medium leading-none">Country</label>
                <input id="country" name="country" type="text" value={formData.country} onChange={handleInputChange} disabled={!isEditing} className={inputClassName} aria-label="Country" />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel} aria-label="Cancel editing" tabIndex={0}>Cancel</Button>
                <Button onClick={handleSave} aria-label="Save changes" tabIndex={0}>Save Changes</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}