class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  # Scopes
  scope :active, -> { where(archived_at: nil) }
  scope :inactive, -> { where.not(archived_at: nil) }

  # Methods
  def active?
    archived_at.blank?
  end

  def deactivate
    update(archived_at: Time.current)
  end

  def reactivate
    update(archived_at: nil)
  end

  private

  def password_required?
    !persisted? || !password.blank? || !password_confirmation.blank?
  end
end
