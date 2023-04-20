class AuthController < ApplicationController
    skip_before_action :authorized, only: [:login, :logout]

  def login
    @user = User.find_by(email: user_login_params[:email])
    #User#authenticate comes from BCrypt
    if @user && @user.authenticate(user_login_params[:password])
      # encode token comes from ApplicationController
      token = encode_token({ user_id: @user.id })
      render json: {logged_in: true, user: @user, jwt: token }, status: :accepted

    else
      render json: { message: 'Invalid email or password' }, status: :unauthorized
    end
  end

def logout
    token.delete :user_id
    render json: { message: 'Logged out successfully' }
  end

  private

  def user_login_params
    params.permit(:email, :password)
  end
end
