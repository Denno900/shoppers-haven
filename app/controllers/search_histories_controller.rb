class SearchHistoriesController < ApplicationController
  before_action :set_search_history, only: %i[ show update destroy ]

  # GET /search_histories
  def index
    @search_histories = current_user.search_histories.all

    render json: @search_histories
  end

  # GET /search_histories/1
  def show
    render json: @search_history
  end

  # POST /search_histories
#  def create
  
def create
  @search_history = current_user.search_histories.new(search_history_params)
  if @search_history.save
    render json: @search_history , status: :created
  else
    render json: @search_history.errors, status: :unprocessable_entity
  end
end
# end
  

  # PATCH/PUT /search_histories/1
  def update
    if @search_history.update(search_history_params)
      render json: @search_history
    else
      render json: @search_history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /search_histories/1
  def destroy
    @search_history.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_search_history
      @search_history = SearchHistory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
   def search_history_params
  params.permit(:query, :user_id)
end
end
