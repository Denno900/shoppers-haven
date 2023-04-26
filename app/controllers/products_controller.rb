class ProductsController < ApplicationController
  # before_action :set_product, only: %i[ show update destroy index ]
  skip_before_action :authorized, only: [:index]


  # GET /products
def index
  if params[:search].present?
    @products = Product.where("name LIKE ?", "%#{params[:search]}%")
  else
    @products = Product.all
  end
      
  render json: @products
end

  

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:name, :price, :rating, :delivery_cost, :mode, :ecommerce_website_id)
    end
end
