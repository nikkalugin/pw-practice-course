import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {

    private readonly editProfileButton: Locator = this.page.getByRole('button', { name: 'Edit profile' });
    public readonly profileName: Locator = this.page.locator('.profile_name');
    public readonly profilePhoto: Locator = this.page.locator('.profile_photo');
    public readonly profileBirthday: Locator = this.page.locator('.icon-birthday + .profile-info_text');
    public readonly profileCountry: Locator = this.page.locator('.icon-country + .profile-info_text');

    async navigate() {
        await super.navigate('/panel/profile');
    }

    async openEditProfileForm() {
        await this.editProfileButton.click();
    }
}