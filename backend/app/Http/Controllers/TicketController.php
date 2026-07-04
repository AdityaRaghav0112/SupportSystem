<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    private function ticketQuery(Request $request)
    {
        $query = Ticket::query();

        if ($request->user()->role === 'management') {
            return $query;
        }

        if ($request->user()->role === 'it') {
            $query->where('assigned_department', 'IT Department');
        } else {
            $query->where('user_id', $request->user()->id);
        }

        return $query;
    }

    // Get tickets for the logged-in user or all tickets for management
    public function index(Request $request)
    {
        $tickets = $this->ticketQuery($request)
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
        $ticket = $this->ticketQuery($request)->findOrFail($id);

        return response()->json($ticket);
    }

    // Update ticket
    public function update(Request $request, $id)
    {
        $ticket = $this->ticketQuery($request)->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'priority' => 'sometimes|in:Low,Medium,High',
            'status' => 'sometimes|in:Pending,Assigned,In Progress,Resolved,Closed',
            'assigned_department' => 'sometimes|nullable|string|max:255',
        ]);

        if (
            $request->user()->role === 'management' &&
            array_key_exists('assigned_department', $validated) &&
            ! isset($validated['status'])
        ) {
            $validated['status'] = 'Assigned';
        }

        $ticket->update($validated);
        $ticket->refresh();

        return response()->json([
            'message' => 'Ticket updated successfully.',
            'ticket' => $ticket,
        ]);
    }

    // Delete ticket
    public function destroy(Request $request, $id)
    {
        $ticket = $this->ticketQuery($request)->findOrFail($id);

        $ticket->delete();

        return response()->json([
            'message' => 'Ticket deleted successfully.',
        ]);
    }
}