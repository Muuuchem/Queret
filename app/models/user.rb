class User < ApplicationRecord

  has_many :questions,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: :Question

  has_many :comments,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: :Comment

  attr_reader :password

  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: :true

  after_initialize :ensure_session_token
  before_validation :ensure_session_token_uniqueness

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil unless @user
    @user.password_is?(password) ? @user : nil
  end

  def password_is?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.base64
    ensure_session_token_uniqueness
    self.save
    self.session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  private

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
