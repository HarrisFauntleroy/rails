class SidebarComponent < ViewComponent::Base
  include Turbo::FramesHelper
  include Devise::Controllers::Helpers

  def initialize(current_user:, online_stats:)
    @current_user = current_user
    @online_stats = online_stats
  end

  private

  attr_reader :current_user, :online_stats

  def nav_items
    [
      { title: t("home"), path: root_path, id: "home_link" },
      { title: t("forum"), path: forums_path, id: "forums_link" },
      { title: t("members"), path: users_path, id: "members_link" },
      { title: t("member_map"), path: nil },
      { title: t("hv_wiki"), path: nil },
      { title: t("chat_room"), path: nil },
      { title: t("site_rules"), path: site_rules_path, id: "site_rules_link" }
    ]
  end

  def user_role_details
    return unless current_user

    if current_user.admin?
      { role: t("admin"), image: "English_main_admin.png" }
    elsif current_user.moderator?
      { role: t("moderator"), image: "English_moderator.png" }
    else
      { role: t("user"), image: nil }
    end
  end
end
