class WikisController < ApplicationController
  before_action :set_wiki, only: %i[ show edit update destroy hide ]
  after_action :verify_authorized, only: [:edit, :update, :destroy]

  # GET /wikis or /wikis.json
  def index
    respond_to do |format|
      format.json do
        @wikis = Wiki.all
        render json: @wikis
      end
      format.html do
        first_parent = Wiki.where(parent_id: nil).order(:sort_order).first
        if first_parent
          redirect_to wiki_path(first_parent)
        else
          head :not_found # or render a fallback page
        end
      end
    end
  end

  def show
    @wiki = Wiki.find_by!(slug: params[:id])
  end

  def hide
    # authorize @wiki
    @wiki.toggle_hidden
    if @wiki.save
      redirect_back fallback_location: wiki_path(@wiki)
    else
      redirect_back fallback_location: wiki_path(@wiki), alert: "Failed to update."
    end
  end

  # GET /wikis/new
  def new
    @wiki = Wiki.new
    @parent = Wiki.find_by(slug: params[:parent])
    authorize @wiki
  end

  # GET /wikis/1/edit
  def edit
    authorize @wiki
  end

  # POST /wikis or /wikis.json
  def create
    @wiki = Wiki.new(wiki_params)

    respond_to do |format|
      if @wiki.save
        format.html { redirect_to wiki_url(@wiki), notice: "Wiki was successfully created." }
        format.json { render :show, status: :created, location: @wiki }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @wiki.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /wikis/1 or /wikis/1.json
  def update
    authorize @wiki
    respond_to do |format|
      if @wiki.update(wiki_params)
        format.html { redirect_to wiki_url(@wiki), notice: "Wiki was successfully updated." }
        format.json { render :show, status: :ok, location: @wiki }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @wiki.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wikis/1 or /wikis/1.json
  def destroy
    authorize @wiki
    @wiki.destroy

    respond_to do |format|
      format.html { redirect_to wikis_url, notice: "Wiki was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wiki
      @wiki = Wiki.find_by!(slug: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def wiki_params
      params.require(:wiki).permit(:title, :content, :slug, :parent_id, :sort_order)
    end
end
