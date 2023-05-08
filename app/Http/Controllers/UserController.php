<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    /**
     * Create a new user.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function create(UserRequest $request)
    {
        // TODO: Implement create user logic
    }

    /**
     * Update an existing user.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, int $id)
    {
        // TODO: Implement update user logic
    }

    /**
     * Retrieve a specific user for editing.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // TODO: Implement edit user logic
    }

    /**
     * Retrieve a specific user for display.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function display($id)
    {
        // TODO: Implement display user logic
    }

    /**
     * Delete a specific user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // TODO: Implement delete user logic
    }

    /**
     * Search for users by name or email.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        // TODO: Implement search user logic
    }

    /**
     * Paginate users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function paginate(Request $request)
    {
        // TODO: Implement paginate user logic
    }

    /**
     * Retrieve all users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO: Implement index user logic
    }
}
