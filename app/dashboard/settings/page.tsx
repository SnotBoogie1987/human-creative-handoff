'use client'

import { useState, useEffect } from 'react'
import { Settings as SettingsIcon, Bell, Lock, Shield, Trash2, Save, Check } from 'lucide-react'
import { Input, Button, Separator } from '@/components/ui'
import { getUserWithProfileAction, updateProfileAction, saveNotificationSettingsAction } from '../profile/actions'
import type { Profile } from '@/lib/auth/types'

interface NotificationSettings {
  emailJobAlerts: boolean
  emailMessages: boolean
  emailUpdates: boolean
  smsJobAlerts: boolean
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Notification preferences (stored in local state for now)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailJobAlerts: true,
    emailMessages: true,
    emailUpdates: false,
    smsJobAlerts: false,
  })

  // Load profile data
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getUserWithProfileAction()
        if (data) {
          setProfile(data.profile)
          setEmail(data.email || '')

          // Load notification settings from profile
          if (data.profile.notification_settings) {
            setNotifications(data.profile.notification_settings)
          }
        }
      } catch (error) {
        // Failed to load profile
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    try {
      const result = await saveNotificationSettingsAction(notifications)

      if (result.success) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        console.error('Failed to save notification settings:', result.error)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black text-white">Settings</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Manage your account preferences, notifications, and privacy settings.
          </p>
        </div>

        {/* Account Information */}
        <section className="mb-12">
          <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-black text-white">Account Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-regular text-text-dark">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className="bg-gray-900 cursor-not-allowed opacity-60"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-mono">
                    Cannot be changed
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-regular text-text-dark">
                  Change Password
                </label>
                <p className="text-gray-400 text-sm mb-4">
                  Password management is handled through Supabase authentication.
                </p>
                <Button variant="outline" disabled>
                  Reset Password
                  <span className="ml-2 text-xs">(Coming Soon)</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-12">
          <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-black text-white">Notification Preferences</h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Choose how you want to be notified about jobs, messages, and updates.
            </p>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-white font-bold mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <ToggleSetting
                    label="Job Alerts"
                    description="Get notified when new jobs match your profile"
                    checked={notifications.emailJobAlerts}
                    onChange={() => handleNotificationToggle('emailJobAlerts')}
                  />
                  <ToggleSetting
                    label="Messages"
                    description="Receive email notifications for new messages"
                    checked={notifications.emailMessages}
                    onChange={() => handleNotificationToggle('emailMessages')}
                  />
                  <ToggleSetting
                    label="Platform Updates"
                    description="News, features, and community updates"
                    checked={notifications.emailUpdates}
                    onChange={() => handleNotificationToggle('emailUpdates')}
                  />
                </div>
              </div>

              <Separator />

              {/* SMS Notifications */}
              <div>
                <h3 className="text-white font-bold mb-4">SMS Notifications</h3>
                <div className="space-y-4">
                  <ToggleSetting
                    label="Urgent Job Alerts"
                    description="Get SMS for time-sensitive opportunities"
                    checked={notifications.smsJobAlerts}
                    onChange={() => handleNotificationToggle('smsJobAlerts')}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <Button onClick={handleSaveNotifications} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Save className="h-4 w-4 mr-2 animate-pulse" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-12">
          <div className="bg-background-dark border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-black text-white">Privacy & Security</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold mb-2">Profile Visibility</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Your profile is visible to verified agencies and production companies. You can
                  control additional visibility settings below.
                </p>
                <ToggleSetting
                  label="Show on public directory"
                  description="Allow your profile to appear in public searches (coming soon)"
                  checked={false}
                  onChange={() => {}}
                  disabled
                />
              </div>

              <Separator />

              <div>
                <h3 className="text-white font-bold mb-2">Data & Privacy</h3>
                <div className="space-y-3">
                  <button className="text-primary hover:underline text-sm font-mono">
                    Download my data
                  </button>
                  <br />
                  <button className="text-primary hover:underline text-sm font-mono">
                    View privacy policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="h-5 w-5 text-red-500" />
              <h2 className="text-2xl font-black text-red-500">Danger Zone</h2>
            </div>

            <div>
              <h3 className="text-white font-bold mb-2">Delete Account</h3>
              <p className="text-gray-400 text-sm mb-6">
                Permanently delete your HUMAN. Creative account and all associated data. This action
                cannot be undone.
              </p>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Toggle Setting Component
interface ToggleSettingProps {
  label: string
  description: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

function ToggleSetting({ label, description, checked, onChange, disabled }: ToggleSettingProps) {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1">
        <label className="text-white font-mono text-sm block mb-1">{label}</label>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
      <button
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
