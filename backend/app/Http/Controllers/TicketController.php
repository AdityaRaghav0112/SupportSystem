<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Get all tickets of logged-in user
    public function index(Request $request)
    {
        $tickets = Ticket::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($tickets);
    }

    // Create ticket
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $ticket = Ticket::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Ticket created successfully.',
            'ticket' => $ticket,
        ], 201);
    }

    // Show one ticket
    public function show(Request $request, $id)
    {
        $ticket = Ticket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($ticket);
    }

    // Update ticket
    public function update(Request $request, $id)
    {
        $ticket = Ticket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priority' => 'sometimes|in:Low,Medium,High',
            'status' => 'sometimes|in:Pending,Assigned,In Progress,Resolved,Closed',
        ]);

        $ticket->update($validated);

        return response()->json([
            'message' => 'Ticket updated successfully.',
            'ticket' => $ticket,
        ]);
    }

    // Delete ticket
    public function destroy(Request $request, $id)
    {
        $ticket = Ticket::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully.',
        ]);
    }
}