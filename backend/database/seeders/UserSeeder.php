<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'user@payspot.com'],
            [
                'name' => 'User',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );

        User::updateOrCreate(
            ['email' => 'manager@payspot.com'],
            [
                'name' => 'Management',
                'password' => Hash::make('password'),
                'role' => 'management',
            ]
        );

        User::updateOrCreate(
            ['email' => 'it@payspot.com'],
            [
                'name' => 'IT Department',
                'password' => Hash::make('password'),
                'role' => 'it',
            ]
        );
    }
}