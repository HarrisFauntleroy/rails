require 'rails_helper'

RSpec.describe CategoryPolicy do
  subject { described_class.new(user, category) } 

  let(:category) { FactoryBot.create(:category) }

  context "for unauthenticated visitors" do
    let(:user) { nil } 

    it { should permit(:index) }
    it { should permit(:show)  }
    it { should_not permit(:create) }
    it { should_not permit(:edit)  }
    it { should_not permit(:update)  }
    it { should_not permit(:destroy)  }
  end

  context "for regular users" do
    let(:user) { FactoryBot.create(:user) }

    it { should permit(:index) }
    it { should permit(:show)  }
    it { should_not permit(:create) }
    it { should_not permit(:edit)  }
    it { should_not permit(:update)  }
    it { should_not permit(:destroy)  }
  end

  context "for admins" do
    let(:user) { FactoryBot.create(:user, admin: true) }

    it { should permit(:index) }
    it { should permit(:show)  }
    it { should permit(:create) }
    it { should permit(:edit)  }
    it { should permit(:update)  }
    it { should permit(:destroy)  }
  end
end
