<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

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
                'password' => 'password',
                'role' => 'user',
            ]
        );

        User::updateOrCreate(
            ['email' => 'manager@payspot.com'],
            [
                'name' => 'Management',
                'password' => 'password',
                'role' => 'management',
            ]
        );

        User::updateOrCreate(
            ['email' => 'it@payspot.com'],
            [
                'name' => 'IT Department',
                'password' => 'password',
                'role' => 'it',
            ]
        );
    }
}