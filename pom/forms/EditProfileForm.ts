import { Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class EditProfileForm extends BaseForm {
    public readonly formTitle: Locator = this.page.getByRole('heading', { name: 'Edit profile' });
    private readonly nameField: Locator = this.page.locator('#editProfileName');
    private readonly lastNameField: Locator = this.page.locator('#editProfileLastName');
    private readonly countryField: Locator = this.page.locator('#editProfileCountry');
    private readonly birthdayField: Locator = this.page.locator('#editProfileDateBirth');
    private readonly photoField: Locator = this.page.locator('input#editProfilePhoto');
    private readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });
    public readonly emptyNameErrorMessage: Locator = this.page.locator('.invalid-feedback p', { hasText: 'Name is required' });
    public readonly emptyLastNameErrorMessage: Locator = this.page.locator('.invalid-feedback p', { hasText: 'Last name is required' });
    public readonly invalidCountryErrorMessage: Locator = this.page.locator('.invalid-feedback p', { hasText: 'Country is invalid' });
    public readonly invalidLengthCountryErrorMessage: Locator = this.page.locator('.invalid-feedback p', { hasText: 'Country has to be from 2 to 20 characters long' });

    async enterName(name: string) {
        await this.nameField.fill(name);
        await this.nameField.blur();
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
        await this.lastNameField.blur();
    }

    async enterCountry(country: string) {
        await this.countryField.fill(country);
        await this.countryField.blur();
    }

    async enterBirthday(birthday: string) {
        await this.birthdayField.fill(birthday);
    }

    async addPhoto(imagePath: string) {
        await this.photoField.setInputFiles(imagePath);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }
}